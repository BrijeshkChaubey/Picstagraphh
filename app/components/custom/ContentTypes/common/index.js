import _ImageWrap from './_ImageWrap';
import _Like from './_Like';
import _PostVideo from './_PostVideo';
import _PostMeta from './_PostMeta';
import { _DescriptionLink } from './_Description';
import {filter} from 'lodash'

const deletedFilter = (data) => data ? filter(data, dt => !dt.isDelete) : []

export { _ImageWrap, _Like, _PostVideo, _PostMeta, _DescriptionLink, deletedFilter }
