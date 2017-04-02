defmodule KatashinInfo.Repo.Migrations.ChangeBodyInArticles do
  use Ecto.Migration

  def change do
    alter table(:articles) do
      modify :body, :text, null: false
    end
  end
end
