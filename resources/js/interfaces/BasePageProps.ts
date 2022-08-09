import { Page, PageProps } from '@inertiajs/inertia'
import { User } from './User'

export type BasePageProps<T = unknown> = Page<PageProps & Record<'loggedUser', User | undefined | null> & T>
