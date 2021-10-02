#version 330 compatibility

out float vLightIntensity; 
out vec2 vST;
out vec4 vColor;
out float vX, vY;
out vec3 vMCposition;

const vec3 LIGHTPOS = const vec3( -2., 0., 10.);

void
main( )
{
    vST = gl_MultiTexCoord0.st;

    /*light*/
    vec3 tnorm      = normalize( gl_NormalMatrix * gl_Normal );
    vec3 ECposition = vec3( gl_ModelViewMatrix * gl_Vertex );
    vLightIntensity  = abs( dot( normalize(LIGHTPOS - ECposition), tnorm ) );

    vColor = vec4(gl_Color.rgb, 1.);
    
    vMCposition = gl_Vertex.xyz;
    vX = vMCposition.x;
    vY = vMCposition.y;

    gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
