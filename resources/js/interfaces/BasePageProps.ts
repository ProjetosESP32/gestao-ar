import { Page, PageProps } from '@inertiajs/inertia'
import { User } from './User'

export type BasePageProps<T> = Page<PageProps & Record<'loggedUser', User> & T>
