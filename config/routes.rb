Rails.application.routes.draw do

  match 'ping'         => 'tools#ping',           as: :ping, via: :all
  root 'pages#index'
end
