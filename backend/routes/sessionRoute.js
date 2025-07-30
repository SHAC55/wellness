import express from 'express'
import authMiddleware from '../middleware/authMiddleware.js'
import { getAllSession, getMysessions, getSessionById, postSession, publishSession, saveDraftSession } from '../controller/sessionController.js'

const sessionRoute = express.Router()

sessionRoute.get('/sessions',getAllSession)
sessionRoute.get('/my-sessions',authMiddleware,getMysessions)
sessionRoute.get('/my-sessions/:id',authMiddleware,getSessionById)
sessionRoute.post('/post',authMiddleware,postSession)
sessionRoute.post('/my-sessions/draft',authMiddleware,saveDraftSession)
sessionRoute.post('/my-sessions/publish',authMiddleware,publishSession)

export default sessionRoute ;