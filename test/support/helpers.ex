defmodule KatashinInfo.TestHelpers do

  @session Plug.Session.init [
    store: :cookie,
    key: "key",
    signing_salt: "salt"
  ]

  def sign_in(conn, user) do
    conn
      |> Plug.Session.call(@session)
      |> Plug.Conn.fetch_session
      |> Guardian.Plug.sign_in(user)
  end
end
