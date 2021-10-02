uniform sampler2D ImageUnit;
uniform float RedThreshold, GreenThreshold, BlueThreshold;
varying float LightIntensity;

const float TOL = 0.05;

void main()
{
	vec2 st = gl_TexCoord[0].st;
	st.t = 1. - st.t;		// invert for the teapot
	vec3 irgb = texture2D( ImageUnit,  st ).rgb;
	float r = irgb.r;
	float g = irgb.g;
	float b = irgb.b;

	float alpha = ( 1. - smoothstep( RedThreshold-TOL,   RedThreshold+TOL,   r ) );
	alpha *=      ( 1. - smoothstep( GreenThreshold-TOL, GreenThreshold+TOL, g ) );
	alpha *=      ( 1. - smoothstep( BlueThreshold-TOL,  BlueThreshold+TOL,  b ) );

	if( alpha == 0. )
		discard;

	gl_FragColor = vec4( LightIntensity*irgb, alpha );
}
