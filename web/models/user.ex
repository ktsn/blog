defmodule KatashinInfo.User do
  use KatashinInfo.Web, :model

  require Monad.Error, as: Error
  import Error
  import Comeonin.Bcrypt

  schema "users" do
    field :email, :string
    field :crypted_password, :string
    field :password, :string, virtual: true

    timestamps()
  end

  @doc """
  Builds a changeset based on the `struct` and `params`.
  """
  def changeset(struct, params \\ %{}) do
    changeset = struct
    |> cast(params, [:email, :password])
    |> validate_required([:email, :password])
    |> unique_constraint(:email)
    |> encrypt_password
  end

  def encrypt_password(changeset) do
    case changeset.valid? do
      true -> changeset
        |> put_change(:crypted_password, hashpwsalt(changeset.params["password"]))
        |> delete_change(:password)
      false -> changeset
    end
  end

  @spec validate_password(__MODULE__, String.t) :: Error
  def validate_password(user, password) do
    case checkpw(password, user.crypted_password) do
      true -> return :ok
      false -> fail "Invalid password"
    end
  end
end
