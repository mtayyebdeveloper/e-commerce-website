import {SearchController} from '../controllers/Search.controller.js'
import express from 'express'

const SearchRouter = express.Router()

SearchRouter.route("/search").get(SearchController)

export {SearchRouter}