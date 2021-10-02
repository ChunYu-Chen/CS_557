uniform float Ambient;
uniform float BumpDensity;
uniform float BumpSize;
uniform vec4  SurfaceColor;
uniform float Ang;
uniform float Height;

varying vec3  LightDir;
varying vec3  Normal;

void main()
{
	const float PI = 3.14159265;
	vec3 normal;

	vec2 st = gl_TexCoord[0].st;		// locate the bumps based on (s,t)
	st.s *= 2.;				// makes the bumps round on the equator of the sphere

	vec2 c = BumpDensity * st;		// make lots more bumps
	vec2 uv = fract(c) - vec2(.5,.5);	// (u,v,w) are local coordinates for the bump normal
	uv *= 2.;				// change [-.5,-.5] to [-1.,1.]

	float Ang = (PI/4.);		// 45 degrees
	float up = dot( uv, vec2(cos(Ang), -sin(Ang)) );
	float vp = dot( uv, vec2(sin(Ang),  cos(Ang)) );
	float slope = 2.*Height;

	

	// in surface coords, the normal starts out to be (0,0,1) -- change it from there:

	float w = 1.;		// don't perturb in w

	float u, v;
	if( uv.s >= 0.  && uv.t >= 0. )
	{
		u = slope;	v = slope;
	}
	else if( uv.s >= 0.  &&  uv.t < 0. )
	{
		u = slope;	v = -slope;
	}
	else if( uv.s < 0.  &&  uv.t < 0. )
	{
		u = -slope;	v = -slope;
	}
	else
	{
		u = -slope;	v = slope;
	}


	// see if we are actually in a bump -- BumpSize is the radius:

	if( abs(up) <= BumpSize  &&  abs(vp) <= BumpSize )
	{
		normal = normalize( vec3( u, v, w ) );
	}
	else
	{
		normal = vec3( 0., 0., 1. );
	}

	float intensity = Ambient + (1.-Ambient)*abs( dot(normal, LightDir) );
	vec3 litColor = SurfaceColor.rgb * intensity;
	
	gl_FragColor = vec4( litColor, SurfaceColor.a );
}
