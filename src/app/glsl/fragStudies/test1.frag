#ifdef GL_ES
precision mediump float;
#endif


// below are my declared variables

uniform float u_time;
uniform vec2 u_resolution;



void main() {

//this sets the center to 0,0 and scales resolution

vec2 uv = (gl_FragCoord.xy*2.0-u_resolution.xy)/u_resolution.y;

uv *= 2.0;
uv = fract(uv);
uv -= 0.5;



float d = length(uv);

d =  sin(d*8.0 + u_time)/8.0;

d= abs(d);

d = smoothstep(0.0,0.1,d);



gl_FragColor = vec4(uv.x,uv.y,d,1.0);


}
