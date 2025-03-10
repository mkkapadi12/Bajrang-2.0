import React, { Fragment, useState } from "react";
import { Dialog, Disclosure, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { MinusIcon, PlusIcon } from "@heroicons/react/20/solid";
import ProductList from "../components/ProductList";
import { useFilterContext } from "../Context/FilterContext";
import { Link } from "react-router-dom";
import { subCategories, filters } from "../Data";
import SearchBar from "../helper/Search";
import Sort from "../Shared/Sort";
import { useProductContext } from "../Context/ProductContext";
import Progress from "../helper/Progress";
import Button from "../Styles/Button";
import Navigate from "../Shared/Navigate";
import useTitle from "../Hooks/title";

const Shop = () => {
  useTitle("Shop");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { updateFilterValue, clearFilter } = useFilterContext();
  const { isLoading } = useProductContext();

  return (
    <div className="bg-white">
      <Navigate name={"Shop"} item={"Latkans"} />
      <div>
        {/* Mobile filter dialog */}
        <Transition.Root show={mobileFiltersOpen} as={Fragment}>
          <Dialog
            className="relative z-40 lg:hidden"
            onClose={setMobileFiltersOpen}
          >
            <Transition.Child
              as={Fragment}
              enter="transition-opacity ease-linear duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity ease-linear duration-300"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 z-40 flex">
              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <Dialog.Panel className="relative flex flex-col w-full h-full max-w-xs py-4 pb-12 ml-auto overflow-y-auto bg-white shadow-xl">
                  <div className="flex items-center justify-between px-4">
                    <h2 className="text-lg font-medium text-gray-900">
                      Filters
                    </h2>
                    <button
                      type="button"
                      className="flex items-center justify-center w-10 h-10 p-2 -mr-2 text-gray-400 bg-white rounded-md"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XMarkIcon className="w-6 h-6" aria-hidden="true" />
                    </button>
                  </div>

                  {/* Filters */}
                  <form className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <div className="px-2 py-3 font-medium text-gray-900">
                      {subCategories.map((category) => {
                        return (
                          <>
                            <div key={category.value} className="mb-2">
                              <input
                                id={`filter-mobile-${category.value}`}
                                name={category.id}
                                value={category.value}
                                onClick={updateFilterValue}
                                type="radio"
                                defaultChecked={category.checked}
                                className="hidden w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                              />
                              <label
                                htmlFor={`filter-mobile-${category.value}`}
                                className="flex-1 min-w-0 ml-2 cursor-pointer text-text"
                              >
                                {category.label}
                              </label>
                            </div>
                          </>
                        );
                      })}
                    </div>

                    {filters.map((section) => {
                      return (
                        <>
                          <Disclosure
                            as="div"
                            key={section.id}
                            className="px-4 py-6 border-t border-gray-200"
                          >
                            {({ open }) => (
                              <>
                                <h3 className="flow-root -mx-2 -my-3">
                                  <Disclosure.Button className="flex items-center justify-between w-full px-2 py-3 text-gray-400 bg-white hover:text-gray-500">
                                    <span className="font-medium text-gray-900">
                                      {section.name}
                                    </span>
                                    <span className="flex items-center ml-6">
                                      {open ? (
                                        <MinusIcon
                                          className="w-5 h-5"
                                          aria-hidden="true"
                                          onClick={clearFilter}
                                        />
                                      ) : (
                                        <PlusIcon
                                          className="w-5 h-5"
                                          aria-hidden="true"
                                        />
                                      )}
                                    </span>
                                  </Disclosure.Button>
                                </h3>
                                <Disclosure.Panel className="pt-6">
                                  <div className="space-y-6">
                                    {section.options.map(
                                      (option, optionIdx) => (
                                        <div
                                          key={option.value}
                                          className="flex items-center"
                                        >
                                          <input
                                            id={`filter-mobile-${section.id}-${optionIdx}`}
                                            name={`${section.id}`}
                                            value={option.value}
                                            onClick={updateFilterValue}
                                            type="radio"
                                            defaultChecked={option.checked}
                                            className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                          />
                                          <label
                                            htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                                            className="flex-1 min-w-0 ml-3 text-gray-500"
                                          >
                                            {option.label}
                                          </label>
                                          <div
                                            className={`h-[10px] w-[100px]`}
                                            style={{ background: option.value }}
                                          ></div>
                                        </div>
                                      )
                                    )}
                                  </div>
                                </Disclosure.Panel>
                              </>
                            )}
                          </Disclosure>
                        </>
                      );
                    })}
                    <Link>
                      <Button className="!mt-8 !ml-4" onClick={clearFilter}>
                        Clear Filters
                      </Button>
                    </Link>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>

        <main className="px-4 mx-auto max-w-7xl md:px-6 lg:px-0">
          <div className="w-full">
            <h1 className="mb-4 text-4xl font-bold tracking-tight">Products</h1>
            <p className="mb-6 text-text">
              Vibrant and durable latkan products for every occasion, designed
              to enhance elegance and creativity. From intricate bridal lehenga
              latkans to trendy saree tassels, we bring style and charm to your
              outfits with quality and practicality.
            </p>
          </div>
          <div className="flex flex-col-reverse items-end justify-between gap-8 pb-4 my-4 border-b border-gray-200 md:items-center md:flex-row">
            <SearchBar />
            <div className="flex flex-col items-center justify-end gap-8 sm:w-1/4 sm:flex-row">
              <Sort setMobileFiltersOpen={setMobileFiltersOpen} />
            </div>
          </div>

          <section aria-labelledby="products-heading" className="my-8">
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              {/* Filters */}
              <form className="hidden lg:block">
                <h3 className="sr-only">Categories</h3>
                <ul className="pb-6 space-y-4 text-sm font-medium text-gray-900 border-b border-gray-200">
                  {subCategories.map((category) => (
                    <div key={category.value}>
                      <input
                        id={`filter-mobile-${category.value}`}
                        name={category.id}
                        value={category.value}
                        onClick={updateFilterValue}
                        type="radio"
                        defaultChecked={category.checked}
                        className="hidden w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                      />
                      <label
                        htmlFor={`filter-mobile-${category.value}`}
                        className="flex-1 min-w-0 cursor-pointer text-text"
                      >
                        {category.label}
                      </label>
                    </div>
                  ))}
                </ul>

                {filters.map((section) => (
                  <Disclosure
                    as="div"
                    key={section.id}
                    className="py-6 border-b border-gray-200"
                  >
                    {({ open }) => (
                      <>
                        <h3 className="flow-root -my-3">
                          <Disclosure.Button className="flex items-center justify-between w-full py-3 text-sm text-gray-400 bg-white hover:text-gray-500">
                            <span className="font-medium text-gray-900">
                              {section.name}
                            </span>
                            <span className="flex items-center ml-6">
                              {open ? (
                                <MinusIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                  onClick={clearFilter}
                                />
                              ) : (
                                <PlusIcon
                                  className="w-5 h-5"
                                  aria-hidden="true"
                                />
                              )}
                            </span>
                          </Disclosure.Button>
                        </h3>
                        <Disclosure.Panel className="pt-6">
                          <div className="space-y-4">
                            {section.options.map((option, optionIdx) => (
                              <div
                                key={option.value}
                                className="flex items-center"
                              >
                                <input
                                  id={`filter-${section.id}-${optionIdx}`}
                                  name={`${section.id}`}
                                  value={option.value}
                                  onClick={updateFilterValue}
                                  type="radio"
                                  defaultChecked={option.checked}
                                  className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                                />
                                <label
                                  htmlFor={`filter-${section.id}-${optionIdx}`}
                                  className="flex-1 ml-3 text-sm text-gray-600"
                                >
                                  {option.label}
                                </label>
                                <div
                                  className={`h-[10px] w-[100px]`}
                                  style={{ background: option.value }}
                                ></div>
                              </div>
                            ))}
                          </div>
                        </Disclosure.Panel>
                      </>
                    )}
                  </Disclosure>
                ))}
                <Link>
                  <Button className="!mt-8" onClick={clearFilter}>
                    Clear Filters
                  </Button>
                </Link>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                {isLoading ? <Progress /> : <ProductList />}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};
export default Shop;
