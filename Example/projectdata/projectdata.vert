varying float Temperature;
varying float LightIntensity; 

uniform float Scale;

void
main( void )
{
	float d;
	float t;
	float TMIN =   0.;
	float TMAX = 100.;

	vec3 LightPos = vec3( 0., 0., 10. );
    	vec3 tnorm      = normalize( vec3( gl_NormalMatrix * gl_Normal ) );

	vec3 ECposition = vec3( gl_ModelViewMatrix * gl_Vertex );

    	LightIntensity  = dot( normalize(LightPos - ECposition), tnorm );
    	LightIntensity = abs( LightIntensity );
    	LightIntensity *= 1.5;

	ECposition /= Scale;

	d = distance( ECposition.xyz, vec3(  1.0,  0.0,  0.0 ) );
	t = 160. * exp( -5.0*d*d );

	d = distance( ECposition.xyz, vec3( -1.0,  0.3,  0.0 ) );
	t += 140. * exp( -5.0*d*d );

	d = distance( ECposition.xyz, vec3(  0.0,  1.0,  0.0 ) );
	t += 125. * exp( -5.0*d*d );

	d = distance( ECposition.xyz, vec3(  0.0,  0.4,  1.0 ) );
	t +=  80. * exp( -5.0*d*d );

	d = distance( ECposition.xyz, vec3(  00,  0.0,  0.0 ) );
	t += 150. * exp( -5.0*d*d );

	Temperature = clamp( t, TMIN, TMAX );

	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
