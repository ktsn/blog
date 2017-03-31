defmodule KatashinInfo.Api.V1.AuthView do
  use KatashinInfo.Web, :view

  def render("verify.json", %{authenticated: authenticated}) do
    %{authenticated: authenticated}
  end
end
