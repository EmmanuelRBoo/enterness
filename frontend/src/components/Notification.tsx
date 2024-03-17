import { Text } from '.'

export default function Notification() {
    return (
        <div
            id='notification'
            className={`
                fixed
                top-6
                text-center
                min-w-40
                max-w-80 
                w-fit
                p-4
                rounded-lg
                ring-4
            `}
        >
            <Text bold>Notificação padrão</Text>
        </div>
    )
}