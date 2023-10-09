const getState = ({ getStore, getActions, setStore }) => {
  return {
    store: {
      token: localStorage.getItem("token") || null,
      profile: null,
      message: null,
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      token: localStorage.getItem("token") || null,
      profile: null,
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },

      getMessage: async () => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/hello", {
            mode: "cors",
            headers: {
              Origin: "https://fuzzy-lamp-x7v6jq5gpjrfpxr5-3000.app.github.dev",
            },
          });
          const data = await resp.json();
          setStore({ message: data.message });
          return data;
        } catch (error) {
          console.log("Error loading message from backend", error);
        }
      },
      changeColor: (index, color) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });

        //reset the global store
        setStore({ demo: demo });
      },

      createUser: async (user) => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/User", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
          });
          const data = await resp.json();

          setStore({ profile: data.customer, token: data.token });
          localStorage.setItem("token", data.token);

          return true;
        } catch (error) {
          console.log("Error loading message from backend", error);
          return false;
        }
      },

      loginUser: async (email, password) => {
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/token", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
          });
          const data = await resp.json();
          localStorage.setItem("token", data.token);
          setStore({ token: data.token });
          await getActions().getProfile();
          return true;
        } catch (error) {
          console.log("ERROR");
          return false;
        }
      },

      getProfile: async () => {
        let store = getStore();

        if (!store.token) return;
        try {
          const resp = await fetch(process.env.BACKEND_URL + "/api/profile", {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + store.token,
            },
          });
          const data = await resp.json();
          setStore({ profile: data });
        } catch (error) {
          console.log("ERROR");
        }
      },

      logOut: () => {
        localStorage.removeItem("token");
        setStore({ token: null, profile: null });
      },
    },
  };
};

export default getState;
