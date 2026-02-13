import Swal from 'sweetalert2'
import type { AxiosError } from 'axios'

interface ApiErrorResponse {
    message?: string | string[]
    error?: string
    errors?: Record<string, string[]>
}

export function swalError(err: unknown) {
    let title = 'Error'
    let html = 'Terjadi kesalahan'

    if (err && typeof err === 'object' && 'response' in err) {
        const axiosErr = err as AxiosError<ApiErrorResponse>

        const status = axiosErr.response?.status
        const data = axiosErr.response?.data

        if (status === 401) {
            title = 'Login Gagal'
            html = toHtmlList(data?.message) ?? 'Unauthorized'
        }
        else if (status === 400) {
            title = data?.error || 'Bad Request'
            html = toHtmlList(data?.message) ?? html
        }
        else if (status === 422) {
            title = 'Validasi Gagal'
            html = data?.errors
                ? toHtmlList(Object.values(data.errors).flat())
                : toHtmlList(data?.message) ?? html
        }
        else {
            title = data?.error || title
            html = toHtmlList(data?.message) ?? html
        }
    }

    return Swal.fire({
        icon: 'error',
        title,
        html,
        width: 420,
        scrollbarPadding: false,
    })
}

function toHtmlList(msg?: string | string[]) {
    if (!msg) return null

    const items = Array.isArray(msg) ? msg : [msg]

    return `
    <ul style="
      text-align: left;
      padding-left: 1.25rem;
      list-style-type: disc;
    ">
      ${items.map(m => `<li>${escapeHtml(m)}</li>`).join('')}
    </ul>
  `
}

function escapeHtml(text: string) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
}
