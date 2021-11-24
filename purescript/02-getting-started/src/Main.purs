module Main where

import Prelude

import Effect (Effect)
import Effect.Console (logShow)
import Math (sqrt)
import Data.List

diagonal w h = sqrt (w * w + h * h)

main :: Effect Unit
main = do
  logShow (diagonal 3.0 4.0)
  logShow (range 0 999)
