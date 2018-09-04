class UserController < ApplicationController
   http_basic_authenticate_with message: "hi", name: "garrett", password: "buttsex247"

  def index
  end
  
end
