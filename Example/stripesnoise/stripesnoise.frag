varying float X, Y;
varying vec4 Color;
varying vec3 MCposition;
varying float LightIntensity; 

uniform float DeltaScale;
uniform float A;
uniform float P;
uniform float Tol;
uniform sampler3D Noise3;

void
main( void )
{
	vec4 WHITE = vec4( 1., 1., 1., 1. );
	vec4  noisevec  = texture3D( Noise3, MCposition );
	float deltax = DeltaScale * ( noisevec[0] + noisevec[1] +
                       noisevec[2] + noisevec[3] );


	float f = fract(  A*(X+deltax) );
	
	float t = smoothstep( 0.5-P-Tol, 0.5-P+Tol, f )  -  smoothstep( 0.5+P-Tol, 0.5+P+Tol, f );
	gl_FragColor = mix( WHITE, Color, t );
	gl_FragColor.rgb *= LightIntensity;
}
