class MemoryController < ApplicationController
  http_basic_authenticate_with name: "wifi", password: "password"
  def show
    
  end
end
