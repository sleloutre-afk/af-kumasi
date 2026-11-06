import type { NextRequest } from 'next/server'
import { handleForm } from '@/lib/formEndpoint'

/** Formulaire de la page « Contact ». */
export const POST = (request: NextRequest) => handleForm('contact', request)
