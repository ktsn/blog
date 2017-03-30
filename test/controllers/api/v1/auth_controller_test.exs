defmodule KatashinInfo.Api.V1.AuthControllerTest do
  use KatashinInfo.ConnCase

  alias KatashinInfo.User
  @valid_attrs %{email: "test@example.com", password: "password!"}
  @invalid_attrs %{}

  setup %{conn: conn} do
    {:ok, conn: put_req_header(conn, "accept", "application/json")}
  end

  test "logins email and password are matched", %{conn: conn} do
    user = User.changeset(%User{}, @valid_attrs) |> Repo.insert!
    conn = post conn, login_path(conn, :login), %{auth: @valid_attrs}
    assert Guardian.Plug.authenticated?(conn)
    assert json_response(conn, 200)["data"] == %{"id" => user.id,
      "email" => user.email,
      "inserted_at" => Ecto.DateTime.to_iso8601(user.inserted_at),
      "updated_at" => Ecto.DateTime.to_iso8601(user.updated_at)}
  end

  test "rejects if email is not matched", %{conn: conn} do
    User.changeset(%User{}, @valid_attrs) |> Repo.insert!
    conn = post conn, login_path(conn, :login), %{auth: %{email: "invalid@email.com", password: "password!"}}
    assert json_response(conn, 401)["error"]["message"] == "User not found"
  end

  test "rejects if password is not matched", %{conn: conn} do
    User.changeset(%User{}, @valid_attrs) |> Repo.insert!
    conn = post conn, login_path(conn, :login), %{auth: %{email: "test@example.com", password: "invalid"}}
    assert json_response(conn, 401)["error"]["message"] == "Invalid password"
  end

  test "sign up with email and password", %{conn: conn} do
    conn = post conn, register_path(conn, :register), %{auth: %{email: "test@example.com", password: "password"}}
    %{"data" => data} = json_response(conn, 200)
    user = Repo.get!(User, data["id"])
    assert user.email == data["email"]
  end
end
