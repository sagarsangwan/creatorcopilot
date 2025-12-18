class SimpleUser:
    def __init__(
        self,
        id=None,
        email=None,
    ):
        self.id = id
        self.email = email

    @property
    def is_authenticated(self):
        return True
