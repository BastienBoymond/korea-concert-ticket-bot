function injectCode(src) {
    const script = document.createElement('script');
    script.src = src;
    script.onload = function () {
      this.remove();
    };
  
    const nonNull = (v) => {
      if (v == null) throw new Error('value is null');
      return v;
    }
  
    nonNull(document.head || document.documentElement).appendChild(script);
  }