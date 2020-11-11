import Category from '../entities/Category'

export async function getMockMenu(): Promise<Array<Category>> {
  return [
    'Peixes',
    'Massas',
    'Petiscos',
    'Carnes',
    'Frango',
    'Jacaré',
    'Saladas',
    'Entradas',
    'Hamburguers',
    'Drinks',
    'Bebidas',
    'Sobremesas'
  ].map((name, id) => {
    return {
      id,
      name,
      items: [1, 2, 3, 4, 5].map(id => {
        return {
          id,
          name: `Prato ${id}`,
          description:
            'Filé Grelhado com Risoto de Limão Siciliano e Crispy de Alho Poró.',
          imgUrl: 'https://via.placeholder.com/600/f00',
          thumbnailUrl: 'https://via.placeholder.com/150/#dd2F07',
          price: 'R$ 10,00'
        }
      })
    }
  })
}
