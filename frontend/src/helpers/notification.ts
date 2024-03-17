import { INotification } from '../interfaces/notification'

export default function handleNotification({ message, type }: INotification) {
    const notification = document.getElementById('notification') as HTMLElement
    const notificationMessage = document.querySelector('#notification > p') as HTMLElement
    
    const background = {
        "success": {
            "bg": "bg-green-600",
            "ring": "ring-green-800"
        },
        "info": {
            "bg": "bg-blue-400",
            "ring": "ring-blue-600"
        },
        "error": {
            "bg": "bg-red-600",
            "ring": "ring-red-800"
        }
    }

    const hasBg = notification.className.includes(background[type].bg)
    const hasRing = notification.className.includes(background[type].ring)
    
    notificationMessage.innerHTML = message

    if (!hasBg && !hasRing) {
        notification.classList.add(background[type].bg)
        notification.classList.add(background[type].ring)
    }

    notification.classList.add('show')

    setTimeout(() => {
        notification.classList.remove('show')
    }, 5000)

    setTimeout(() => { 
        notification?.classList.remove(background[type].bg)
        notification?.classList.remove(background[type].ring)
    }, 6000)
}