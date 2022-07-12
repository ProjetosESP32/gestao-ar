import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Service from 'App/Models/Service'
import { generateServiceToken } from 'App/Services/generateServiceToken'
import CreateServiceApiKeyValidator from 'App/Validators/Web/CreateServiceApiKeyValidator'
import UpdateServiceApiKeyValidator from 'App/Validators/Web/UpdateServiceApiKeyValidator'

export default class ServiceApiKeysController {
  public async index({ bouncer, inertia, request }: HttpContextContract) {
    await bouncer.authorize('admin')
    const { page, perPage } = request.qs()
    const pageNumber = Number(page) || 1
    const perPageNumber = Number(perPage) || 10
    const services = await Service.query().paginate(pageNumber, perPageNumber)

    return inertia.render('Admin/API/Index', { services })
  }

  public async store({ bouncer, request, response }: HttpContextContract) {
    await bouncer.authorize('admin')
    const data = await request.validate(CreateServiceApiKeyValidator)

    await Service.create({ ...data, token: generateServiceToken() })

    return response.redirect().toRoute('admin.apis.index ')
  }

  public async update({ bouncer, request, response, params }: HttpContextContract) {
    await bouncer.authorize('admin')
    const service = await Service.findOrFail(params.id)

    const data = await request.validate(UpdateServiceApiKeyValidator)

    service.merge(data)
    await service.save()

    return response.redirect().toRoute('admin.apis.index ')
  }

  public async destroy({ bouncer, response, params }: HttpContextContract) {
    await bouncer.authorize('admin')
    const service = await Service.findOrFail(params.id)

    await service.delete()

    return response.redirect().toRoute('admin.apis.index ')
  }
}
