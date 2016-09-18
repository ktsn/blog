defmodule KatashinInfo.Article do
  use KatashinInfo.Web, :model

  schema "articles" do
    field :title, :string
    field :body, :string

    belongs_to :author, KatashinInfo.User, foreign_key: :author_user_id

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    struct
    |> cast(params, [:title, :body, :author_user_id])
    |> validate_required([:title, :body, :author_user_id])
  end
end
