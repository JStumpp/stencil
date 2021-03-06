import { Config } from '../../../declarations';
import { mockLogger, mockStencilSystem } from '../../../testing/mocks';
import { validateStats } from '../validate-stats';


describe('validateStats', () => {

  let config: Config;

  beforeEach(() => {
    config = {
      sys: mockStencilSystem(),
      logger: mockLogger(),
      rootDir: '/User/some/path/',
      srcDir: '/User/some/path/src/',
      suppressTypeScriptErrors: true,
      flags: {},
      outputTargets: [{
        type: 'www',
        path: '/www'
      }]
    };
  });


  it('adds stats from flags, w/ no outputTargets', () => {
    config.flags.stats = true;

    validateStats(config);
    const o = config.outputTargets.find(o => o.type === 'stats');
    expect(o).toBeDefined();
    expect(o.path).toContain('stencil-stats.json');
  });

  it('uses stats config, custom path', () => {
    config.outputTargets.push({
      type: 'stats',
      path: 'custom-path.json'
    });
    validateStats(config);
    const o = config.outputTargets.find(o => o.type === 'stats');
    expect(o).toBeDefined();
    expect(o.path).toContain('custom-path.json');
  });

  it('uses stats config, defaults path', () => {
    config.outputTargets.push({
      type: 'stats'
    });
    validateStats(config);
    const o = config.outputTargets.find(o => o.type === 'stats');
    expect(o).toBeDefined();
    expect(o.path).toContain('stencil-stats.json');
  });

  it('default no stats', () => {
    validateStats(config);
    expect(config.outputTargets.some(o => o.type === 'stats')).toBe(false);
  });

});
