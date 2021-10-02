#version 330 compatibility

out float vLightIntensity; 
out vec2 vST;
out vec3 vColor;

const vec3 LIGHTPOS = const vec3( -2., 0., 10.);

void
main( )
{
    vST = gl_MultiTexCoord0.st;

    /*light*/
    vec3 tnorm      = normalize( gl_NormalMatrix * gl_Normal );
    vec3 ECposition = vec3( gl_ModelViewMatrix * gl_Vertex );
    vLightIntensity  = abs( dot( normalize(LIGHTPOS - ECposition), tnorm ) );

    vColor = gl_Color.rgb;
    
    gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
