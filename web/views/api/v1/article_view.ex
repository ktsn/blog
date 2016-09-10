defmodule KatashinInfo.Api.V1.ArticleView do
  use KatashinInfo.Web, :view

  alias KatashinInfo.Api.V1.ArticleView
  alias KatashinInfo.Api.V1.PageView

  def render("index.json", %{page: page, articles: articles}) do
    %{page: render_one(page, PageView, "page.json"),
      data: render_many(articles, ArticleView, "article.json")}
  end

  def render("show.json", %{article: article}) do
    %{data: render_one(article, ArticleView, "article.json")}
  end

  def render("article.json", %{article: article}) do
    %{id: article.id,
      title: article.title,
      body: article.body,
      inserted_at: article.inserted_at,
      updated_at: article.updated_at}
  end
end
