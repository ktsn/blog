defmodule KatashinInfo.Api.V1.ArticleController do
  use KatashinInfo.Web, :controller

  alias KatashinInfo.Article

  def index(conn, params) do
    page =
      Article
      |> order_by(desc: :inserted_at)
      |> Repo.paginate(params)

    render conn, "index.json",
      articles: page.entries,
      page: %{
        page_number: page.page_number,
        page_size: page.page_size,
        total_pages: page.total_pages,
        total_entries: page.total_entries}
  end

  def create(conn, %{"article" => article_params}) do
    user = Guardian.Plug.current_resource(conn)
    changeset = Article.changeset(%Article{author_user_id: user.id}, article_params)

    case Repo.insert(changeset) do
      {:ok, article} ->
        conn
        |> put_status(:created)
        |> put_resp_header("location", article_path(conn, :show, article))
        |> render("show.json", article: article)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(KatashinInfo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def show(conn, %{"id" => id}) do
    article = Repo.get!(Article, id)
    render(conn, "show.json", article: article)
  end

  def update(conn, %{"id" => id, "article" => article_params}) do
    article = Repo.get!(Article, id)
    changeset = Article.changeset(article, article_params)

    case Repo.update(changeset) do
      {:ok, article} ->
        render(conn, "show.json", article: article)
      {:error, changeset} ->
        conn
        |> put_status(:unprocessable_entity)
        |> render(KatashinInfo.ChangesetView, "error.json", changeset: changeset)
    end
  end

  def delete(conn, %{"id" => id}) do
    article = Repo.get!(Article, id)

    # Here we use delete! (with a bang) because we expect
    # it to always work (and if it does not, it will raise).
    Repo.delete!(article)

    send_resp(conn, :no_content, "")
  end
end
