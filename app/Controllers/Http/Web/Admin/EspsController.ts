import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Esp from 'App/Models/Esp'
import UpdateEspValidator from 'App/Validators/Web/Admin/UpdateEspValidator'

export default class EspsController {
  public async index({ request, inertia, bouncer }: HttpContextContract) {
    await bouncer.authorize('admin')
    const { page, perPage } = request.qs()
    const pageNumber = Number(page) || 1
    const perPageNumber = Number(perPage) || 10

    const esps = await Esp.query().preload('room').paginate(pageNumber, perPageNumber)

    return inertia.render('Admin/Esps/Index', { esps })
  }

  public async update({ params, request, response, bouncer }: HttpContextContract) {
    await bouncer.authorize('admin')
    const esp = await Esp.findOrFail(params.id)
    const data = await request.validate(UpdateEspValidator)

    esp.merge(data)
    await esp.save()

    return response.redirect().toRoute('admin.esps.index')
  }

  public async destroy({ params, response, bouncer }: HttpContextContract) {
    await bouncer.authorize('admin')
    const esp = await Esp.findOrFail(params.id)

    await esp.delete()

    return response.redirect().toRoute('admin.esps.index')
  }
}
