defmodule KatashinInfo.Api.V1.AuthController do
  use KatashinInfo.Web, :controller

  require Monad.Error, as: Error
  import Error

  import KatashinInfo.User
  alias KatashinInfo.User

  def login(conn, %{"auth" => auth}) do
    query = from u in User,
      where: u.email == ^auth["email"]

    result =
      Error.m do
        user <- case Repo.one(query) do
                  nil -> fail "User not found"
                  user -> return user
                end
        _ <- validate_password(user, auth["password"])
        return user
      end

    case result do
      {:ok, user} -> user
      {:error, reason} -> render_unauthorized(conn, reason)
    end
  end

  def render_unauthorized(conn, reason) do
    conn
    |> put_status(401)
    |> render(KatashinInfo.ErrorView, "401.json", reason: reason)
  end
end
