#version 330 compatibility

uniform float uK;
uniform float uP;
uniform float uLightX;
uniform float uLightY;
uniform float uLightZ;
out vec3 vNs;
out vec3 vLs;
out vec3 vEs;
vec3 vNf,vLf,vEf;
out vec3 vMCposition;
vec3 eyeLightPosition = vec3( uLightX, uLightY, uLightZ );

void
main( )
{
    const float PI = 3.14159265359;
    //vST = gl_MultiTexCoord0.st;

    vec3 vert = gl_Vertex.xyz;
    vert.z = uK * (1-vert.y) * sin( 2.*PI*vert.x/uP );

    float dzdx = uK * (1-vert.y) * (2.*PI/uP) * cos( 2.*PI*vert.x/uP );
    float dzdy = -uK * sin( 2.*PI*vert.x/uP );

    vec3 Tx = vec3(1., 0., dzdx );
    vec3 Ty = vec3(0., 1., dzdy );

    vec3 normal = normalize( cross( Tx, Ty ) ); // after cross
    
    vec4 ECposition = gl_ModelViewMatrix * vec4( vert, 1.);

    vNf = normalize( gl_NormalMatrix * normal ); // surface normal vector
    vNs = vNf;

    vLf = eyeLightPosition - ECposition.xyz; // vector from the point
    vLs = vLf; // to the light position

    vEf = vec3( 0., 0., 0. ) - ECposition.xyz; // vector from the point
    vEs = vEf ; // to the eye position

    vMCposition = vert;
    gl_Position = gl_ModelViewProjectionMatrix * vec4( vert, 1.);
}
