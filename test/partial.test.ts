const demo = (p: Cus_Partial<{ name: string; age: number }>) => {
  console.log(p);
};

demo({
  name: "guoshi",
  age: 12,
});

demo({
  name: "guoshi",
});

// error: name?: string | undefined
demo({
    name: 123,
  });

demo({
  age: 12,
});

// error: not exist property id in { name: string; age: number }
demo({
  name: "guoshi",
  age: 12,
  id: 12,
});
