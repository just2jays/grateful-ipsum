export const PageHeader = () => (
  <header>
    <div className="text-center m-10">
      <p className="dark:text-white transition-colors duration-200 mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
        A better way to Dev...with the Dead!
      </p>
      <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-200 lg:mx-auto">
        In the publishing and graphic design worlds, it's common to need
        "placeholder" text in order to demonstrate how copy will appear
        visually, without relying on{" "}
        <span className="italic">the actual</span> text being available.
        <br />
      </p>
      <p className="mt-4 max-w-2xl text-xl text-gray-500 dark:text-gray-200 lg:mx-auto">
        Enter <span className="font-bold">Grateful Ipsum</span>
        ...placeholder text for{" "}
        <span className="font-mono">{`Dead<head>s`}</span>
      </p>
    </div>
  </header>
);
