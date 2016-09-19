defmodule KatashinInfo.Api.V1.ArticleControllerTest do
  use KatashinInfo.ConnCase

  import KatashinInfo.TestHelpers

  alias KatashinInfo.Article
  alias KatashinInfo.User
  @valid_attrs %{body: "some content", title: "some content"}
  @invalid_attrs %{}
  @user_attrs User.changeset(%User{}, %{email: "test@example.com", password: "pass"})

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "lists all entries on index", %{conn: conn} do
    conn = get conn, article_path(conn, :index)
    assert json_response(conn, 200)["data"] == []
  end

  test "shows chosen resource", %{conn: conn} do
    user = Repo.insert! @user_attrs
    article = Repo.insert! %Article{body: "some content", title: "some content", author_user_id: user.id}
    conn = get conn, article_path(conn, :show, article)
    assert json_response(conn, 200)["data"] == %{"id" => article.id,
      "title" => article.title,
      "body" => article.body,
      "inserted_at" => Ecto.DateTime.to_iso8601(article.inserted_at),
      "updated_at" => Ecto.DateTime.to_iso8601(article.updated_at)}
  end

  test "renders page not found when id is nonexistent", %{conn: conn} do
    assert_error_sent 404, fn ->
      get conn, article_path(conn, :show, -1)
    end
  end

  test "creates and renders resource when data is valid", %{conn: conn} do
    user = Repo.insert! @user_attrs
    conn = conn
    |> sign_in(user)
    |> post(article_path(conn, :create), article: @valid_attrs)

    assert json_response(conn, 201)["data"]["id"]
    assert Repo.get_by(Article, Map.merge(@valid_attrs, %{author_user_id: user.id}))
  end

  test "does not create resource and renders errors when data is invalid", %{conn: conn} do
    user = Repo.insert! @user_attrs
    conn = conn
    |> sign_in(user)
    |> post(article_path(conn, :create), article: @invalid_attrs)
    assert json_response(conn, 422)["errors"] != %{}
  end

  test "updates and renders chosen resource when data is valid", %{conn: conn} do
    user = Repo.insert! @user_attrs
    article = Repo.insert! %Article{body: "content", title: "content", author_user_id: user.id}
    conn = conn
    |> sign_in(user)
    |> put(article_path(conn, :update, article), article: @valid_attrs)

    assert json_response(conn, 200)["data"]["id"]
    assert Repo.get_by(Article, Map.merge(@valid_attrs, %{author_user_id: user.id}))
  end

  test "deletes chosen resource", %{conn: conn} do
    user = Repo.insert! @user_attrs
    article = Repo.insert! %Article{body: "some content", title: "some content", author_user_id: user.id}
    conn = conn
    |> sign_in(user)
    |> delete(article_path(conn, :delete, article))

    assert response(conn, 204)
    refute Repo.get(Article, article.id)
  end
end
