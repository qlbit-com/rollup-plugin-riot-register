'use strict';

var glob = require('fast-glob');

const rollupRiotRegister = ( paths = [], source = "riot:components" ) => {
  const camelize = ( str ) =>
    str.toLowerCase().replace( /[-_\s.]+(.)?/g, ( _, c ) => c.toUpperCase() );
  return {
    name: 'rollup-plugin-riot-register',
    resolveId: ( id ) => source === id ? id : null,
    load: async ( id ) => {
      if( source !== id )
        return null
      const imp = [], reg = [];
      for( const path of glob.sync( paths ) ) {
        const tokens = path.split( '/' );
        const last = tokens[ tokens.length - 1 ];
        const name = last.replace( /\.riot$/i, '' );
        if( last.length == name.length )
          continue
        const cname = camelize( ' ' + name );
        imp.push( `import ${ cname } from '${ path }'` );
        reg.push( `\n  register( '${ name }', ${ cname } )` );
      }
      const code = 'import { register } from \'riot\'\n' + imp.join( '\n' ) +
                   '\n\nexport default () => {' + reg.join( ',' ) + '\n}\n';
      return code
    }
  }
};

module.exports = rollupRiotRegister;
