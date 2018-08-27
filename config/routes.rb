Rails.application.routes.draw do
  get 'hello_world', to: 'hello_world#index'
  resource :memory, only: [:show]
  root "memory#show"
end
