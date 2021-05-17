import "../css/componentes.css";
import googleLogo from '../assets/img/google.jpg';

export const saludar = ( nombre ) => {

    console.log('Crenado la etiqueta h1');

    const h1 = document.createElement('h1');

    h1.innerText = `Hola, ${ nombre }, como estas?`;

    document.body.append( h1 );

    //IMG

    console.log(googleLogo);
    const img = document.createElement('img');
    img.src = googleLogo;
    document.body.append( img );

}