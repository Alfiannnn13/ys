import Filter from '@/components/Filter';
import ProductList from '@/components/ProductList';
import SearchBar from '@/components/SearchBar';
import { wixClientServer } from '@/lib/useWixClient';
import Image from 'next/image';
import { Suspense } from 'react';

const ListPage = async ({ searchParams }: { searchParams: any }) => {
  const wixClient = await wixClientServer();
  const cat = await wixClient.collections.getCollectionBySlug(
    searchParams.cat || 'all-products'
  );

  return (
    <div className="px-4 md:px-8 lg:px-16 xl:32 2xl:px-64 relative">
      {/* Promo section */}
      <div className="hidden sm:flex bg-orange-50 justify-between h-64 px-4">
        <div className="w-2/3 flex flex-col items-center justify-center gap-8">
          <h1 className="text-4xl font-semibold leading-[48px] text-gray-700">
            Dapatkan diskon hingga 50% untuk <br /> Produk Terpilih
          </h1>
          <button className="rounded-3xl bg-polos text-white w-max py-3 px-5 text-sm">
            Beli Sekarang
          </button>
        </div>
        <div className="relative w-1/3">
          <Image src="/woman.png" alt="" fill className="object-contain" />
        </div>
      </div>

      {/* SearchBar section - shown on small screens */}
      <div className="sm:hidden mt-4">
        <SearchBar />
      </div>

      {/* Filter section */}
      <Filter />

      {/* Products section */}
      <h1 className="mt-12 text-xl font-semibold">{cat?.collection?.name} Untuk Anda</h1>
      <Suspense fallback="Loading...">
        <ProductList
          categoryId={cat.collection?._id || '00000000-000000-000000-000000000001'}
          searchParams={searchParams}
        />
      </Suspense>
    </div>
  );
};

export default ListPage;
