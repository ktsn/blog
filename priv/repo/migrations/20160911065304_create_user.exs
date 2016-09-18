defmodule KatashinInfo.Repo.Migrations.CreateUser do
  use Ecto.Migration

  def change do
    create table(:users) do
      add :email, :string, null: false
      add :crypted_password, :string, null: false

      timestamps()
    end

    create unique_index(:users, [:email])

    alter table(:articles) do
      add :author_user_id, references(:users), null: false
    end
  end
end
