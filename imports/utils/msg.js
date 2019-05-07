import Alert from 'react-s-alert';
const _settings = {
    position: 'bottom-right',
    effect: 'bouncyflip',
    beep: false,
    timeout: 10000,
    offset: 100
};
export default msg = (f,m) => {
    if (m!==""){
        f(m,_settings)
    }
};