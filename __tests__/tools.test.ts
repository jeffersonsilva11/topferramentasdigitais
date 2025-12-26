import { tools, getToolBySlug, getToolMetadata } from '@/lib/tools';

describe('Tools Library', () => {
  it('should have exactly 20 tools', () => {
    expect(tools).toHaveLength(20);
  });

  it('should find tool by slug', () => {
    const tool = getToolBySlug('meu-ip');
    expect(tool).toBeDefined();
    expect(tool?.name).toBe('Qual é meu IP');
  });

  it('should return undefined for non-existent slug', () => {
    const tool = getToolBySlug('non-existent-slug');
    expect(tool).toBeUndefined();
  });

  it('should generate metadata for a tool', () => {
    const tool = tools[0];
    const metadata = getToolMetadata(tool);

    expect(metadata.title).toContain(tool.name);
    expect(metadata.description).toBe(tool.metaDescription);
    expect(metadata.keywords).toEqual(tool.keywords);
  });

  it('all tools should have required fields', () => {
    tools.forEach((tool) => {
      expect(tool.id).toBeDefined();
      expect(tool.name).toBeDefined();
      expect(tool.description).toBeDefined();
      expect(tool.slug).toBeDefined();
      expect(tool.icon).toBeDefined();
      expect(tool.keywords).toBeDefined();
      expect(Array.isArray(tool.keywords)).toBe(true);
    });
  });

  it('all slugs should be unique', () => {
    const slugs = tools.map((tool) => tool.slug);
    const uniqueSlugs = new Set(slugs);
    expect(slugs.length).toBe(uniqueSlugs.size);
  });
});
