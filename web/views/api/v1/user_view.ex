defmodule KatashinInfo.Api.V1.UserView do
  use KatashinInfo.Web, :view

  alias KatashinInfo.Api.V1.UserView

  def render("show.json", %{user: user}) do
    %{data: render_one(user, UserView, "user.json")}
  end

  def render("user.json", %{user: user}) do
    %{id: user.id,
      email: user.email,
      inserted_at: user.inserted_at,
      updated_at: user.updated_at}
  end
end
