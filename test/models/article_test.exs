defmodule KatashinInfo.ArticleTest do
  use KatashinInfo.ModelCase

  alias KatashinInfo.Article

  @valid_attrs %{body: "some content", title: "some content", author_user_id: 1}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Article.changeset(%Article{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Article.changeset(%Article{}, @invalid_attrs)
    refute changeset.valid?
  end
end
