class BlogPost extends HTMLElement {
    #title = '';

    constructor() {
        super();
        // this is the blog-post in the DOM

        // const shadowRoot = this.attachShadow({mode: 'closed'})
        this.attachShadow({
            mode: 'open',
            delegatesFocus: true  //
        })

        // use shadowRoot if you want to isolate it from outside styles/content
        // this.innerHTML = `
        // shadowRoot.innerHTML = `
        // this.shadowRoot.innerHTML = `
        // <div class="blog-post">
        //     <h2>My Post Title</h2>
        //     <p>Art party master cleanse small batch health goth echo park sartorial squid taxidermy biodiesel banjo austin affogato viral.</p>
        //     <a href="">Learn More</a>
        // `

        this.render();
    }

    connectedCallback() {
        // console.log('--mounted')
        console.log('--connectedCallback')
        // this.render();
    }

    // disconnectedCallback() {
    //     console.log('--unmounted')
    // }

    set title(value) {
        this.#title = value
    }
    get title(value) {
        return this.#title
    }

    set data(value) {
        console.log('--value', value)
        this.titleElement.textContent = value.title || this.titleElement.textContent;
        this.descElement.textContent = value.description || this.descElement.textContent;
        this.linkElement.setAttribute('href', value.link || this.linkElement.href)

    }

    static get observedAttributes() {
        // return ['title', 'description', 'link', 'id']   
        return ['title', 'description', 'link']
    }

    attributeChangedCallback(name, oldValue, newValue) {
        //console.log('--attributeChangedCAllback',
        //     name, oldValue, newValue, this.hasAttribute(name))
        console.log('--attributeChangedCallback')

        switch (name) {
            case 'title':
                // this.title = newValue || '';
                this.titleElement.textContent = newValue || '';
                break;
            case 'description':
                // this.description = newValue || '';
                this.descElement.textContent = newValue || '';

                break;
            case 'link':
                // this.link = newValue || '';
                this.linkElement.setAttribute('href', newValue || '')

                break;
        }

    }


    render() {
        // this.shadowRoot.innerHTML = `
        // <div class="blog-post">
        //     <h2>${this.title}</h2>
        //     <p>${this.description}</p>
        //     <a href="${this.link}" style="outline: none">learn more</a>
        // `;
        this.shadowRoot.innerHTML = `
        <div class="blog-post">
            <h2></h2>
            <p></p>
            <a href="" style="outline: none">learn more</a>
        `;

        this.titleElement = this.shadowRoot.querySelector('h2');
        this.descElement = this.shadowRoot.querySelector('p');
        this.linkElement = this.shadowRoot.querySelector('a');
    }

}


customElements.define('blog-post', BlogPost);

{
    const post = document.querySelector('blog-post');
    // console.log('--post', post)
    // console.log('--post', post.shadowRoot)

    // post.shadowRoot.querySelector('.blog-post').style.background = '#900'

    // setTimeout(() => {
    //     post.remove();
    // }, 2500);

    // setTimeout(() => {
    //     post.removeAttribute('title');
    // }, 2500);


    post.data = {
        title: "Web Components",
        description: 'This is some descrption',
        link: '/link/to/post'

    }


}

