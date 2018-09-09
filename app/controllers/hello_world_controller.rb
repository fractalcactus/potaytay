# frozen_string_literal: true

class HelloWorldController < ApplicationController
  http_basic_authenticate_with name: ENV["USERNAME"], password: ENV["PASSWORD"]
  layout "hello_world"

  def index
    @memory_props = Memory.all.as_json(:only => [:top, :left, :text, :image])
    @quote_props =  generate_quote_props
  end

  private

  def generate_quote_props
    {     jasper:   eval(ENV["jasper"]),
          brigette: eval(ENV["brigette"]),
          andrew:   eval(ENV["andrew"]),
          louise:   eval(ENV["louise"]),
          will:     eval(ENV["will"]),
          thijs:    eval(ENV["thijs"]),
          daniel:   eval(ENV["daniel"]),
          gabby:    eval(ENV["gabby"]),
          rose:     eval(ENV["rose"]),
          eden:     eval(ENV["eden"]),
          ollie:    eval(ENV["ollie"]),
          harry:    eval(ENV["harry"]),
          bella:    eval(ENV["bella"]),
          will:     eval(ENV["will"]),
          india:    eval(ENV["india"]),
          anna:     eval(ENV["anna"])
    }
  end
end
