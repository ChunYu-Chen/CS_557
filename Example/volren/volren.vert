varying float Temperature;

void
main( void )
{
	vec3 ECposition = vec3( gl_ModelViewMatrix * gl_Vertex );

	const float TMIN =   0.;
	const float TMAX = 100.;

	float d = distance( ECposition.xyz, vec3(  1.0,  0.0,  0.0 ) );
	float t = 160. * exp( -5.0*d*d );

	d = distance( ECposition.xyz, vec3( -1.0,  0.3,  0.0 ) );
	t += 140. * exp( -5.0*d*d );

	d = distance( ECposition.xyz, vec3(  0.0,  1.0,  0.0 ) );
	t += 125. * exp( -5.0*d*d );

	d = distance( ECposition.xyz, vec3(  0.0,  0.4,  1.0 ) );
	t +=  80. * exp( -5.0*d*d );

	d = distance( ECposition.xyz, vec3(  0.0,  0.0,  0.0 ) );
	t += 150. * exp( -5.0*d*d );

	Temperature = clamp( t, TMIN, TMAX );

	gl_Position = gl_ModelViewProjectionMatrix * gl_Vertex;
}
