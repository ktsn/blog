defmodule KatashinInfo.PageController do
  use KatashinInfo.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end
end
