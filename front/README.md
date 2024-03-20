# Proyecto Integrador

1. Instalamos: npm install @reduxjs/toolkit react-redux
2. Configuración inicial: Provider en main.jsx
3. Store

STORE
    Estado Global de Redux
    {
        actualUser: {
            userData: {},
            userAppointments: []
        }
    }
    Reducer => EJECUTOR
        Recibe ACTIONS => { type, payload }

Login
1. dispath(setUserData(usuarioLogueado))